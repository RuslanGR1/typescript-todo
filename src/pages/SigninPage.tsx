import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "features/auth/authApiSlice";
import { setCredentials } from "features/auth/authSlice";

interface Props {}

const SignupPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const response = await login({ ...data });
    console.log("response", response, typeof response);
    
    dispatch(setCredentials({ ...response }));

    navigate("/");
  });

  return (
    <div className="wrapper flex justify-center items-center">
      <div className="inner w-[600px] min-h-[400px] bg-slate-100 mt-[150px] rounded shadow">
        <form
          onSubmit={onSubmit}
          className="py-5 pb-10 px-10 flex flex-col space-y-[20px]"
        >
          <h1 className="text-4xl">Авторизация</h1>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="username">
              Имя пользователя
            </label>
            <input
              autoFocus
              id="username"
              {...register("username", { required: true })}
              className="outline-0 border-0 rounded p-2 shadow"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="outline-0 border-0 rounded p-2 shadow"
            />
          </div>

          <input
            type="submit"
            className="block bg-gray-400 text-white p-2 rounded shadow hover:bg-gray-500 mt-10 hover:mx-5 transition-all"
            value="Войти"
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
