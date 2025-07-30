type Props = {
  children: React.ReactNode;
};
export const MainLayouts = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1024px",
        padding: "0 16px",
      }}
    >
      {children}
    </div>
  );
};
