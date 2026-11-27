"use client";

import { SignIn } from "@clerk/nextjs";

interface SignInClientProps {
  routing?: "path";
  path?: string;
}

export default function SignInClient({
  routing = "path",
  path = "/auth/sign-in",
}: SignInClientProps) {
  return <SignIn routing={routing} path={path} />;
}