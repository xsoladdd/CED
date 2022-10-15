import { NextPage } from "next";
import PageLoading from "../dashboard/Layout/PageLoading";
import useAuth from "../../hooks/useAuth";
import Background from "./components/Background";
import IconArea from "./components/IconArea";
import LoginForm from "./components/LoginForm";

const Login: NextPage = () => {
  const { loading } = useAuth();
  return loading ? (
    <div className="h-screen w-screen">
      <PageLoading />
    </div>
  ) : (
    <>
      <Background />
      <div className="h-screen w-screen flex place-items-center place-content-center">
        <div className="w-[900px]  min-h-[400px]  overflow-hidden flex bg-white">
          <IconArea />
          <LoginForm />
        </div>
      </div>
    </>
  );
};
export default Login;
