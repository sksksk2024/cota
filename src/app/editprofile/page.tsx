'use client';

import { useToast } from '@/components/hooks/useToast';
import { motion } from 'framer-motion';
import { OpenEye } from '@/components/svgs/OpenEye';
import { CloseEye } from '@/components/svgs/CloseEye';
import { Locked } from '@/components/svgs/Locked';
import { Unlocked } from '@/components/svgs/Unlocked';
import {
  buttonVariants,
  mainButtonVariants,
  inputVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/components/hooks/useUser';
import { editProfileSchema, EditProfileInput } from '@/lib/schemas';
import { ProtectedPageCustom } from '@/components/ProtectedPageCustom';
import PageWrapper from '@/components/PageWrapper';
import { ConfirmModal } from '@/components/utils/ConfirmModal';
import { useTranslation } from '@/components/hooks/useTranslation';

const EditProfile = () => {
  const { t } = useTranslation();
  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();
  const { theme } = useThemeStore();
  const { user } = useUser();

  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isOAuthUser, setIsOAuthUser] = useState(true);

  useEffect(() => {
    if (user.id) {
      setName(user.name ?? '');
      setEmail(user.email ?? '');
      setIsOAuthUser(
        user.accounts && user.accounts.length > 0
          ? user.accounts[0] !== 'credentials'
          : false
      );
    }
  }, [user]);

  const handleDeleteClick = () => {
    setShowConfirm(true); // just show modal
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleDeleteUser = async () => {
    loading('Deleting User...');
    try {
      const res = await fetch('/api/deleteuser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });

      dismiss();

      if (res.ok) {
        success('User Successfully Deleted!');
        router.push('/');
      } else {
        const data = await res.json();
        error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      error(`Something went wrong: ${err}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: EditProfileInput = {
      userId: user?.id,
      name,
    };

    if (!isOAuthUser) {
      setIsOAuthUser(false);
      formData.email = email;
      if (password) formData.password = password;
      if (confirmPassword) formData.confirmPassword = confirmPassword;
    }

    const result = editProfileSchema.safeParse(formData);
    if (!result.success) {
      const errorList = result.error.errors
        .map((err) => err.message)
        .join('\n');
      setErrorMsg(errorList);
      return;
    }

    loading('Editing User...');
    try {
      const res = await fetch('/api/editprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      dismiss();

      if (!res.ok) {
        error(data.error || 'Something went wrong');
        return;
      }

      success('User Successfully Edited!');
      router.push('/');
    } catch (err) {
      setErrorMsg(`Network error or unexpected issue: ${err}`);
      error('Something went wrong.');
    }
  };

  return (
    <ProtectedPageCustom>
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
            {t('edit.title')}
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className={`shadow-deep-green flex flex-col justify-center items-center gap-5 px-16P py-32P rounded-5BR w-full min-w-container-300 max-w-container-600
        caret-black md:px-32P
        ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
        `}
          >
            {/* EDIT NAME */}
            <label
              className={`relative group w-full
            ${!editName && 'cursor-not-allowed select-none'}
          `}
              htmlFor="name"
              aria-label="Enter Name"
            >
              <motion.input
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={isOAuthUser || !editName}
                tabIndex={isOAuthUser || !editName ? -1 : 0}
                className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              ${!editName && 'pointer-events-none'}
              `}
                id="name"
                name="name"
                type="text"
                placeholder={t('placeholders.name')}
                variants={inputVariants}
                initial="hidden"
                whileHover="hover"
              />
              {!editName ? (
                <button
                  type="button"
                  aria-label="Edit Name"
                  disabled={isOAuthUser}
                  className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                  typeof="button"
                  onClick={() => setEditName(true)}
                >
                  <Locked className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Hide Name"
                  disabled={isOAuthUser}
                  className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? ' hover:text-background-dark group-hover:bg-warning'
                : ' hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                  onClick={() => setEditName(false)}
                >
                  <Unlocked />
                </button>
              )}
            </label>

            {/* EDIT EMAIL */}
            <label
              className={`relative group w-full
            ${!editEmail && 'cursor-not-allowed select-none'}
          `}
              htmlFor="email"
              aria-label="Enter Email"
            >
              <motion.input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isOAuthUser || !editEmail}
                tabIndex={isOAuthUser || !editEmail ? -1 : 0}
                className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              ${!editEmail && 'pointer-events-none'}
              `}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                variants={inputVariants}
                initial="hidden"
                whileHover="hover"
              />
              {!editEmail ? (
                <button
                  type="button"
                  aria-label="Edit Email"
                  disabled={isOAuthUser}
                  className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                  typeof="button"
                  onClick={() => setEditEmail(true)}
                >
                  <Locked className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Hide Email"
                  disabled={isOAuthUser}
                  className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? ' hover:text-background-dark group-hover:bg-warning'
                : ' hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                  onClick={() => setEditEmail(false)}
                >
                  <Unlocked />
                </button>
              )}
            </label>

            {!isOAuthUser && (
              <>
                {/* EDIT PASSWORD */}
                <label
                  className={`relative group w-full`}
                  htmlFor="password"
                  aria-label="Enter Password"
                >
                  <motion.input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
                    id="password"
                    name="password"
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder={t('placeholders.newPassword')}
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
                      typeof="button"
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
                ? ' hover:text-background-dark group-hover:bg-warning'
                : ' hover:text-cyan-dark group-hover:bg-highlight'
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={`${showConfirmPassword ? 'text' : 'password'}`}
                    placeholder={t('placeholders.confirmPassword')}
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
                      typeof="button"
                      onClick={() => setShowConfirmPassword(true)}
                    >
                      <OpenEye />
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label="Hide Confirm Password"
                      className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? ' hover:text-background-dark group-hover:bg-warning'
                : ' hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                      onClick={() => setShowConfirmPassword(false)}
                    >
                      <CloseEye />
                    </button>
                  )}
                </label>
              </>
            )}

            {/* Edit Profile Button */}
            <motion.button
              type="submit"
              className={`flex justify-center items-center gap-2 font-bold text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
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
              <div className="text-lg">{t('edit.action')}</div>
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

          {/* HOME LINK && DELETE LINK */}
          <div className="flex flex-col-reverse justify-center items-center gap-5 w-full min-w-container-300 max-w-container-600 xs:flex-row">
            <motion.div
              className={`w-full text-center cursor-pointer p-16P rounded-5BR font-bold tracking-wide xs:w-1/2
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
              : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
          }
          `}
              variants={buttonVariants}
              initial="hidden"
              animate="exit"
              whileHover="hover"
            >
              <Link href="/" passHref>
                {t('edit.home')}
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={handleDeleteClick}
              className={`w-full cursor-pointer p-16P rounded-5BR font-bold tracking-wide xs:w-1/2
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
              variants={buttonVariants}
              initial="hidden"
              whileHover="hover"
            >
              {t('edit.delete')}
            </motion.button>

            <ConfirmModal
              show={showConfirm}
              message="Are you sure you want to delete your user? This cannot be undone."
              onCancel={handleCancel}
              onConfirm={handleDeleteUser}
            />
          </div>

          {isOAuthUser && (
            <p
              className={`text-center text-sm
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
        `}
            >
              {t('edit.err')}
            </p>
          )}
        </main>
      </PageWrapper>
    </ProtectedPageCustom>
  );
};

export default EditProfile;
