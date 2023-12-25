import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  auth?: boolean;
  onClick?: () => void;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) router.push(href);
  }, [onClick, href, router, auth, currentUser, loginModal]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div
        className="
        relative 
        rounded-full 
        h-14 
        w-14
        p-4
        flex
        items-center
        justify-center 
        hover:bg-slate-300 
        hover:bg-opacity-10
        cursor-pointer
        lg:hidden
        "
      >
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-6 -left-1" size={70} />
        ) : null}
      </div>

      <div
        className="
      relative
      hidden
      lg:flex
      items-center
      gap-4
      p-4
      rounded-full
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-6 -left-1" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
