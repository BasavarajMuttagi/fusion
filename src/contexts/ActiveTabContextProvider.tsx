// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";

// type activeTabType = "IMAGE" | "VIDEO";

// export const ActiveTabContext = createContext<
//   [activeTabType, Dispatch<SetStateAction<activeTabType>>]
// >(["IMAGE", () => {}]);

// const ActiveTabContextProvider = ({ children }: { children: ReactNode }) => {
//   const [activeTab, setActiveTab] = useState<activeTabType>("IMAGE");

//   return (
//     <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
//       {children}
//     </ActiveTabContext.Provider>
//   );
// };

// export default ActiveTabContextProvider;
// export const useActiveTab = () => useContext(ActiveTabContext);
