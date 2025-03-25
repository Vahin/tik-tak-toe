import { sessionService } from "@/entities/user/server";
import { SignOutButton } from "@/features/auth";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const { session } = await sessionService.verifySession();

  return (
    <div className="flex flex-col grow">
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tik tak toe Online</div>
        <div className="flex items-center gap-4">
          <div className="text-lg">{session.login}</div>
          <SignOutButton>Выход</SignOutButton>
        </div>
      </header>
      {children}
    </div>
  );
};

export default PrivateLayout;
