class Mobile {
	constructor() {
		this.batteryLevel = 100; // Pin tối đa là 100
		this.phoneState = false; // Trạng thái điện thoại (tắt lúc khởi tạo)
		this.draftMessagesStorage = []; // Lưu tin nhắn đang soạn
		this.inboxMessagesStorage = []; // Hộp thư đến
		this.sentMessagesStorage = []; // Hộp thư đã gửi
	}

	// Kiểm tra trạng thái điện thoại bật hay tắt
	checkState() {
		return this.phoneState;
	}

	// Bật điện thoại
	turnOn() {
		if (!this.phoneState) {
			this.phoneState = true;
			console.log("Phone is now ON.");
		} else {
			console.log("Phone is already ON.");
		}
	}

	// Tắt điện thoại
	turnOff() {
		if (this.phoneState) {
			this.phoneState = false;
			console.log("Phone is now OFF.");
		} else {
			console.log("Phone is already OFF.");
		}
	}

	// Xạc pin cho điện thoại
	chargeBattery() {
		this.batteryLevel = 100;
		console.log("Phone is fully charged.");
	}

	// Soạn tin nhắn
	composeMessage(message) {
		if (this.phoneState && this.batteryLevel > 0) {
			this.draftMessagesStorage.push(message);
			this.batteryLevel--;
			console.log("Message composed.");
		} else {
			console.log("Cannot compose message. Phone is OFF or battery is empty.");
		}
	}

	// Nhận tin nhắn từ một điện thoại khác
	receiveMessage(message) {
		if (this.phoneState && this.batteryLevel > 0) {
			this.inboxMessagesStorage.push(message);
			this.batteryLevel--;
			console.log("Message received.");
		} else {
			console.log("Cannot receive message. Phone is OFF or battery is empty.");
		}
	}

	// Gửi tin nhắn tới một điện thoại khác
	sendMessage(receiver) {
		if (this.phoneState && this.batteryLevel > 0) {
			if (this.draftMessagesStorage.length > 0) {
				const message = this.draftMessagesStorage.pop();
				receiver.receiveMessage(message);
				this.sentMessagesStorage.push(message);
				this.batteryLevel--;
				console.log("Message sent.");
			} else {
				console.log("No message to send.");
			}
		} else {
			console.log("Cannot send message. Phone is OFF or battery is empty.");
		}
	}

	// Kiểm tra tin nhắn đã gửi
	checkSentMessages() {
		if (this.phoneState && this.batteryLevel > 0) {
			this.batteryLevel--;
			return this.sentMessagesStorage;
		} else {
			console.log(
				"Cannot check sent messages. Phone is OFF or battery is empty."
			);
			return [];
		}
	}

	// Kiểm tra tin nhắn trong hộp thư đến
	checkInboxMessages() {
		if (this.phoneState && this.batteryLevel > 0) {
			this.batteryLevel--;
			return this.inboxMessagesStorage;
		} else {
			console.log("Cannot check inbox. Phone is OFF or battery is empty.");
			return [];
		}
	}
}

// Ví dụ sử dụng lớp Mobile

let phone1 = new Mobile();
let phone2 = new Mobile();

phone1.turnOn();
phone1.composeMessage("Hello from phone1");
phone1.sendMessage(phone2);

phone2.turnOn();
console.log("Phone2 Inbox: ", phone2.checkInboxMessages());
console.log("Phone1 Sent Messages: ", phone1.checkSentMessages());
