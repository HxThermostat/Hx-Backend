import render, { button, textRow, spacer } from "./template";

import { ShareAccessLevel } from "../../schema/resolvers-types";

type EmailParams = {
  email_template_id: string;
  email_body_html: string;
  email_subject: string;
};

const TEMPLATE_ID = "jci_hx_kraftful_template";

export default {
  /* eslint-disable @typescript-eslint/camelcase */
  signIn: (
    userEmail: string,
    { includeButton } = { includeButton: true }
  ): EmailParams => {
    const token = "[[user_password_reset_token]][[user_confirmation_token]]";
    const subject = `Hx confirmation code: ${token}`;
    const preview = includeButton
      ? "Tap or enter code to sign in to the Hx app."
      : "Enter code to sign in to the Hx app.";
    const body = includeButton
      ? `
      ${textRow(
        "To sign in to your Hx app, please confirm your email address.",
        { marginBottom: 0 }
      )}
      ${spacer()}
      ${button("Sign in", `/signIn/${userEmail.trim()}/${token}`)}
      ${spacer()}
      ${textRow(
        "If the button above doesn't work, you can manually enter this code in your Hx app:"
      )}
      ${textRow(token, {
        extraStyle:
          "font-weight: 300; letter-spacing: 4px; text-align: center;",
        fontSize: 20,
        lineHeight: 22,
        marginBottom: 30,
      })}
      `
      : `
      ${textRow(
        "To sign in to your Hx app, please confirm your email address.",
        { marginBottom: 0 }
      )}
      ${textRow("Enter this code in your Hx app:")}
      ${textRow(token, {
        extraStyle:
          "font-weight: 300; letter-spacing: 4px; text-align: center;",
        fontSize: 20,
        lineHeight: 22,
        marginBottom: 30,
      })}
      `;

    return {
      email_template_id: TEMPLATE_ID,
      email_subject: subject,
      email_body_html: render({
        subject,
        preview,
        body,
      }),
    };
  },
  requestAccess: (
    dealerEmail: string,
    accessLevel: ShareAccessLevel,
    limitAccess: boolean
  ): EmailParams => {
    const subject = "Grant access to thermostat";
    return {
      email_template_id: TEMPLATE_ID,
      email_subject: subject,
      email_body_html: render({
        subject,
        body: `
      ${textRow("Your dealer is requesting remote access to your thermostat.", {
        marginBottom: 15,
      })}
      ${textRow("You can grant access in your Hx app.", {
        marginBottom: 0,
      })}
      ${spacer()}
      ${button(
        "Open app",
        `/grantAccess/${dealerEmail.trim()}/${accessLevel}/${
          limitAccess ? "1" : ""
        }`
      )}
      ${spacer()}
      ${textRow(
        "If the button above doesn't work, you can also grant access to your dealer from the settings of the Hx app.",
        {
          marginBottom: 30,
        }
      )}
      `,
      }),
    };
  },
  serviceReminder: (): EmailParams => {
    const subject = "Hx™ Thermostat Service Reminder";
    return {
      email_template_id: TEMPLATE_ID,
      email_subject: subject,
      email_body_html: render({
        subject,
        preview: subject,
        body: `
        ${textRow(
          "It's time to schedule a maintenance checkup for your system."
        )}
        ${textRow(
          "Proper maintenance will help keep your system running at peak performance, saving you money and keeping you comfortable all year long!"
        )}
        ${textRow("Please contact your local dealer to schedule a visit.")}
        ${textRow(
          "You can configure these reminders in the Hx app under Settings > Notifications > Service reminders.",
          { fontSize: 11, marginBottom: 30 }
        )}
        `,
      }),
    };
  },
  // TBD
  grantAccess: (): EmailParams => ({
    email_template_id: "",
    email_subject: "Thermostat access granted",
    email_body_html: "",
  }),
  /* eslint-enable @typescript-eslint/camelcase */
};
