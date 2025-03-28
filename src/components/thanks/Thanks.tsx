import CreateThanksForm from "./CreateThanksForm";
import { ThanksList } from "./ThanksList";

export const Thanks = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <CreateThanksForm />
      <ThanksList />
    </div>
  );
};
