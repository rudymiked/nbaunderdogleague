export const CURRENT_DATE: Date = new Date();

// switch seasons in July, after the playoffs are over.
export const CURRENT_YEAR: number = CURRENT_DATE.getMonth() < 7 ? CURRENT_DATE.getFullYear() - 1 : CURRENT_DATE.getFullYear();
export const NBA_START_DATE: Date = new Date("10/18/" + CURRENT_YEAR);
export const NBA_END_DATE: Date = new Date("7/01/" + CURRENT_YEAR);

export const FAILED_LOGIN = "Could not log you in. Please close your browser and try again.";
export const LOGGING_IN = "Logging in...";
export const SOMETHING_WENT_WRONG = "Something went wrong.";
export const ADMIN_EMAIL: string = "rudymiked@gmail.com";

export const SITE_NAME: string = "NBA Underdogs";