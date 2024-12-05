import Container from "@/components/ui/container";
import React, { PropsWithChildren } from "react";
import MenuOptions from "./MenuOptions";
import MenuContent from "./MenuContent";

const Sidebar = ({ children }: PropsWithChildren) => {
  return (
    <Container className="grid md:grid-cols-[240px_1fr] grid-cols-1 gap-8 md:p-8">
      <div>
        <MenuOptions className="p-2 pl-4" defaultOpen={true}>
          <MenuContent />
        </MenuOptions>
        <MenuOptions>
          <MenuContent />
        </MenuOptions>
      </div>
      <div>{children}</div>
    </Container>
  );
};

export default Sidebar;
