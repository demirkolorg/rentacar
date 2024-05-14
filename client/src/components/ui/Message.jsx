import { message } from "antd";

const Message = ({ type, text }) => {
  message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
    zIndex: 100000, // Modalınızın z-index'inden daha yüksek
  });

  if (type === "success") {
    return message.success(text);
  }

  if (type === "error") {
    return message.error(text);
  }
};
export default Message;
