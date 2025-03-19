import Link from "next/link";

type AuthFormLayoutProps = {
  text: string;
  linkText: string;
  href: string;
};

export const AuthFormLink = (props: AuthFormLayoutProps) => {
  const { text, linkText, href } = props;
  return (
    <p className="text-center text-sm">
      {text}{" "}
      <Link href={href} className="text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
};
