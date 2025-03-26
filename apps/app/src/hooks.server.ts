import { createContext } from "@/lib/trpc/context";
import { router } from "@/lib/trpc/router";
import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createTRPCHandle } from "trpc-sveltekit";
import { handle as authenticationHandle } from "./auth";

// Middleware to bypass authentication for webhook endpoints
const webhookBypassHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith("/api/webhooks/")) {
		return resolve(event);
	}

	return await resolve(event);
};

const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Skip authorization check for webhook endpoints
	if (
		event.url.pathname.startsWith("/api/stripe-webhook") ||
		event.url.pathname.startsWith("/api/webhooks/")
	) {
		return resolve(event);
	}

	const isOnSigninPage = event.url.pathname.startsWith("/signin");
	const session = await event.locals.auth();

	if (!isOnSigninPage && !session) {
		throw redirect(303, "/signin");
	}

	const isOnRoot = event.url.pathname === "/";
	if ((isOnSigninPage || isOnRoot) && session) {
		throw redirect(303, "/dashboard");
	}

	return resolve(event);
};

const handleTRPC: Handle = createTRPCHandle({ router, createContext });

export const handle: Handle = sequence(
	webhookBypassHandle,
	authenticationHandle,
	authorizationHandle,
	handleTRPC
);
