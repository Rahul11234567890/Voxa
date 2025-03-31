import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const signIn = async () => {
    await signInWithPopup(auth, provider);
    router.push("/chat");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button onClick={signIn} className="p-4 bg-blue-500 text-white rounded-lg">
        Sign in with Google
      </button>
    </div>
  );
}
