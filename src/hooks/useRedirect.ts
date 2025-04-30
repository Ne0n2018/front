import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role, User } from "@/type/type";

export const useRoleBasedRedirect = (user: User | null) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === Role.USER) {
        router.push("/");
      } else if (user.role === Role.TEACHER && user.id) {
        router.push(`/teachers/edit/${user.id}`);
      } else if (user.role === Role.ADMIN) {
        router.push("/admin");
      } else {
        console.error("Invalid user data or role");
        router.push("/");
      }
    }
  }, [user, router]);
};
