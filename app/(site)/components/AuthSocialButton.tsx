import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        justify-center
        rounded-lg
        bg-transparent
        border
        border-gray-300
        shadow-sm
        hover:shadow-purple-200
        hover:border-purple-500
        px-4
        py-2
        text-sm
        font-medium
        text-gray-700
        hover:bg-gray-50
        focus:outline-offset-0
        transition
        duration-150
    "
    >
      <Icon size={20} />
    </button>
  );
};

export default AuthSocialButton;
