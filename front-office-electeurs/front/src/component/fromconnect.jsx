

const Form = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-lg p-6 text-black">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Welcome back to <span className="text-[#7747ff]">App</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Log in to your account
      </div>
      <form className="flex flex-col gap-3">
        <div className="block relative">
          <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label htmlFor="password" className="block text-gray-600 text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded border border-gray-200 text-sm w-full h-11 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div>
          <a className="text-sm text-[#7747ff]" href="#">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm"
        >
          Submit
        </button>
      </form>
      <div className="text-sm text-center mt-4">
        Don’t have an account yet?{' '}
        <a className="text-sm text-[#7747ff]" href="#">
          Sign up for free!
        </a>
      </div>
    </div>
  );
}

export default Form;
