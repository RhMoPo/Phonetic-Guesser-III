import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RiLogoutBoxFill } from "react-icons/ri";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 mt-4">
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-white mt-10 border rounded-lg border-4 border-black bg-white px-6 py-3 text-xl font-bold text-black transition duration-100 hover:bg-mint hover:text-gray-900">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
