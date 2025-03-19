type RootLayoutProps = {
  children: React.ReactNode;
  actions: React.ReactNode;
};

export const Layout = ({ children, actions }: RootLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-end gap-4">{actions}</div>
      <div className="grid grid-cols-4 gap-4">{children}</div>
    </div>
  );
};
