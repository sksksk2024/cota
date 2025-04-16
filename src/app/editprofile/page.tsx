'use client';

import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OpenEye from '@/components/svgs/openEye.svg';
import CloseEye from '@/components/svgs/closeEye.svg';
import Locked from '@/components/svgs/locked.svg';
import Unlocked from '@/components/svgs/unlocked.svg';
import { useUser } from '@/components/hooks/useUser';
import { editProfileSchema, EditProfileInput } from '@/lib/validations/schemas';

const EditProfile = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const user = useUser();

  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleDeleteUser = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete your user? This cannot be undone.'
    );
    if (!confirmed) return;

    const res = await fetch('/api/deleteuser', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    });

    if (res.ok) {
      alert('User Deleted');
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: EditProfileInput = {
      userId: user?.id,
    };

    if (name !== user?.name) formData.name = name;
    if (email !== user?.email) formData.email = email;
    if (password) formData.password = password;
    if (confirmPassword) formData.confirmPassword = confirmPassword;

    // Validate with ZOD
    const result = editProfileSchema.safeParse(formData);
    if (!result.success) {
      const errorList = result.error.errors
        .map((err) => err.message)
        .join('\n');
      setErrorMsg(errorList);
      return;
    }

    try {
      const res = await fetch('/api/editprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          name,
          email,
          ...(password && { password }),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Something went wrong');
        return;
      }
      router.push('/');
      // alert('Profile Updated!');
    } catch (err) {
      setErrorMsg('Network error or unexpected issue');
    }
  };

  return (
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
        Edit Profile Page
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
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!editName}
            tabIndex={!editName ? -1 : 0}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              ${!editName && 'pointer-events-none'}
              `}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
          {!editName ? (
            <button
              type="button"
              aria-label="Edit Name"
              className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
              typeof="button"
              onClick={() => setEditName(true)}
            >
              <Locked />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Hide Name"
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
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!editEmail}
            tabIndex={!editEmail ? -1 : 0}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              ${!editEmail && 'pointer-events-none'}
              `}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          {!editEmail ? (
            <button
              type="button"
              aria-label="Edit Email"
              className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
              typeof="button"
              onClick={() => setEditEmail(true)}
            >
              <Locked />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Hide Email"
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

        {/* EDIT PASSWORD */}
        <label className={`relative group w-full`} htmlFor="password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="password"
            name="password"
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="New Password"
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
        <label className={`relative group w-full`} htmlFor="confirmPassword">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="confirmPassword"
            name="confirmPassword"
            type={`${showConfirmPassword ? 'text' : 'password'}`}
            placeholder="Confirm Password"
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

        {/* Edit Profile Button */}
        <button
          type="submit"
          className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
        >
          Edit Profile
        </button>

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
      <div className="flex justify-center items-center gap-5 w-full min-w-container-300 max-w-container-600">
        <Link
          className={`text-center w-1/2 cursor-pointer px-16P py-8P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
          href="/"
          passHref
        >
          Go Home
        </Link>

        <button
          type="button"
          onClick={handleDeleteUser}
          className={`w-1/2 cursor-pointer px-16P py-8P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
        >
          Delete User
        </button>
      </div>
    </main>
  );
};

export default EditProfile;
