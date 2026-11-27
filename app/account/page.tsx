import { Metadata } from "next";
import AccountClient from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "Mon compte - Boutique COGI",
  description: "Gérez votre profil Boutique COGI.",
};

export default function AccountPage() {
  return <AccountClient />;
}
