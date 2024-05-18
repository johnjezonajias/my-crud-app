import { MainNavigation } from "@/components/MainNavigation";

export default function Home(): JSX.Element {
  return (
    <div className="w-full p-10">
      <h1 className="text-3xl font-bold mb-8">Welcome to CRUD sample app!</h1>
      <MainNavigation />
    </div>
  );  
}
