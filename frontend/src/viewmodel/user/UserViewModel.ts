import { useEffect, useState } from "react";
import { userService } from "../../services/user/UserService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [press, setPress] = useState<boolean>(false);

  const login = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error("email and password are required");
      }
      const response = await userService.login(email, password);
      sessionStorage.setItem("user", JSON.stringify(response));
      setIsLogged(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err instanceof AxiosError ? err?.response?.data : err?.message;

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    setIsLogged(false);
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && !press) {
        setPress(true);
        login();
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "Enter") {
        setPress(false); // libera para detectar novamente
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [press]);

  return {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    login,
    isLogged,
  };
}
