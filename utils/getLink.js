function getLink(value, tag) {
	switch (tag) {
		case "linkedin":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "instagram":
			return "https://www.instagram.com/" + value;
		case "facebook":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "youtube":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "twitter":
			return "https://www.twitter.com/" + value;
		case "pinterest":
			return "https://www.pinterest.com/" + value;
		case "snapchat":
			return "https://www.snapchat.com/add/" + value;
		case "tiktok":
			if (value.includes("@")) {
				return "https://www.tiktok.com/" + value;
			} else {
				return "https://www.tiktok.com/@" + value;
			}
		case "twitch":
			return "https://www.twitch.tv/" + value;
		case "behance":
			return "https://www.behance.net/" + value;
		case "email":
			return "mailto:" + value;
		case "text":
			return "sms:" + value;
		case "call":
			return "tel:" + value;
		case "whatsapp":
			return "https://wa.me/:" + value;
		case "workEmail":
			return "mailto:" + value;
		case "skype":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "calendly":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "customLink":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "website":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "paypal":
			if (value.includes("http")) {
				return value;
			} else {
				return "https://" + value;
			}
		case "venmo":
			return "https://www.venmo.com/" + value;
	}
}
module.exports = getLink;