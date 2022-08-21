import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";
import {
  useRegisterMutation,
  useLoginMutation,
} from "features/auth/authApiSlice";
import { setCredentials } from "features/auth/authSlice";

interface Props {}

const SignupPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(
    ({ username, password, firstName: first_name, lastName: last_name }) => {
      registerUser({
        first_name,
        last_name,
        username,
        password,
      }).then((response) => {
        login({ username, password }).then((response: any) => {
          if (response.error) {
            if (response.error.status === 401) {
              alert(response.error.data.detail);
            } else {
              console.log("Error", response);
            }
          } else {
            dispatch(setCredentials({ ...response }));
            navigate("/");
          }
        });
      });
    }
  );

  return (
    <div className="wrapper flex justify-center items-center">
      <div className="inner w-[600px] min-h-[400px] bg-slate-100 mt-[150px] rounded shadow">
        <form
          onSubmit={onSubmit}
          className="py-5 pb-10 px-10 flex flex-col space-y-[20px]"
        >
          <h1 className="text-4xl">Регистрация</h1>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-[100%]">
              <label className="mb-2" htmlFor="username">
                Имя
              </label>
              <input
                autoFocus
                id="username"
                {...register("firstName", { required: true })}
                className="outline-0 border-0 rounded p-2 shadow"
              />
            </div>

            <div className="flex flex-col w-[100%]">
              <label className="mb-2" htmlFor="username">
                Фамилия
              </label>
              <input
                autoFocus
                id="username"
                {...register("lastName", { required: true })}
                className="outline-0 border-0 rounded p-2 shadow"
              />
            </div>
          </div>

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

          <div className="flex flex-col mb-4">
            <label className=" mb-2" htmlFor="passwordRepeat">
              Повторите пароль
            </label>
            <input
              type="password"
              id="passwordRepeat"
              {...register("passwordRepeat", { required: true })}
              className="outline-0 border-0 rounded p-2 shadow"
            />
          </div>

          <input
            type="submit"
            className="block bg-gray-400 text-white p-2 rounded shadow hover:bg-gray-500 mt-10 hover:mx-5 transition-all"
            value="Зарегистрироваться"
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
