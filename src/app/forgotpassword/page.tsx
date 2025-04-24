'use client';

import { useToast } from '@/components/hooks/useToast';
import { motion } from 'framer-motion';
import { OpenEye } from '@/components/svgs/OpenEye';
import { CloseEye } from '@/components/svgs/CloseEye';
import {
  buttonVariants,
  mainButtonVariants,
  inputVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/lib/schemas';
import PageWrapper from '@/components/PageWrapper';

const ForgotPassword = () => {
  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();
  const { theme } = useThemeStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ForgotPasswordInput = {
      email,
      newPassword,
      confirmPassword,
    };

    // Validate with ZOD
    const result = forgotPasswordSchema.safeParse(formData);
    if (!result.success) {
      const errorList = result.error.errors
        .map((err) => err.message)
        .join('\n');
      setErrorMsg(errorList);
      return;
    }

    loading('Resetting password...');
    try {
      // Handle the password reset process (e.g., API call)
      const res = await fetch('/api/forgotpassword', {
        method: 'POST',
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      dismiss();

      if (!res.ok) {
        error(data.error || 'Something Went Wrong!');
        return;
      }

      success('Password Successfully Changed!');
      router.push('/signin');
    } catch (err) {
      setErrorMsg('Network error or unexpected issue.');
      error('Something Went Wrong!');
    }
  };

  return (
    <PageWrapper>
      <main
        className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P md:px-64P
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
      >
        {/* PAGE TITLE */}
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          Forgot Password
        </h1>

        {/* FORM */}
        <form
          onSubmit={handlePasswordReset}
          className={`shadow-deep-green flex flex-col justify-center items-center gap-5 px-16P py-32P rounded-5BR w-full min-w-container-300 max-w-container-600
        caret-black md:px-32P
        ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
        `}
        >
          {/* EMAIL INPUT */}
          <label className={`w-full`} htmlFor="email" aria-label="Enter Email">
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
          </label>

          {/* NEW PASSWORD */}
          <label
            className={`relative group w-full`}
            htmlFor="newPassword"
            aria-label="Enter New Password"
          >
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="newPassword"
              name="newPassword"
              type={`${showPassword ? 'text' : 'password'}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
            {!showPassword ? (
              <button
                type="button"
                aria-label="Show Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                onClick={() => setShowPassword(true)}
              >
                <OpenEye />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Hide Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                onClick={() => setShowPassword(false)}
              >
                <CloseEye />
              </button>
            )}
          </label>

          {/* CONFIRM PASSWORD */}
          <label
            className={`relative group w-full`}
            htmlFor="confirmPassword"
            aria-label="Enter Confirm Password"
          >
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="confirmPassword"
              name="confirmPassword"
              type={`${showConfirmPassword ? 'text' : 'password'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
            {!showConfirmPassword ? (
              <button
                type="button"
                aria-label="Show Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                onClick={() => setShowConfirmPassword(true)}
              >
                <OpenEye />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Hide Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                onClick={() => setShowConfirmPassword(false)}
              >
                <CloseEye />
              </button>
            )}
          </label>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
            variants={mainButtonVariants}
            initial="hidden"
            whileHover="hover"
          >
            Reset Password
          </motion.button>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="text-center text-red-500 font-semibold">
              {errorMsg.split('\n').map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          )}
        </form>

        {/* SIGN IN LINK */}
        <motion.div
          className={`w-full min-w-container-300 max-w-container-600 text-center cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          variants={buttonVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link href="/signin" passHref>
            Sign In
          </Link>
        </motion.div>
      </main>
    </PageWrapper>
  );
};

export default ForgotPassword;
