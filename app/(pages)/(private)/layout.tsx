import PanelLayout from "@/components/layouts/PanelLayout";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout(props: PrivateLayoutProps) {
  return <PanelLayout {...props} />;
}
