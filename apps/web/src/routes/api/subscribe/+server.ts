import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { NewsletterModel } from "@repo/models";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		if (!email) {
			return json(
				{
					success: false,
					message: "Email is required! 📧 Please try again."
				},
				{ status: 400 }
			);
		}

		// Check if email already exists
		const existingSubscribers = await NewsletterModel.findWhere("email", email);

		const alreadyExists = existingSubscribers.length > 0;

		if (!alreadyExists) {
			// Create new subscriber
			const id = await NewsletterModel.createEmpty();
			await NewsletterModel.set(id, { email });
		}

		return json({
			success: true,
			alreadyExists,
			message: alreadyExists
				? "Already gotcha! ✨ Welcome back! 🎉"
				: "Awesome! You're all set! 🚀 We'll keep you in the loop! ✉️"
		});
	} catch (error) {
		console.error("Error subscribing:", error);
		return json(
			{
				success: false,
				message: "Oops, something went wrong! 🤔 Please try again later! 🙏"
			},
			{ status: 500 }
		);
	}
};
