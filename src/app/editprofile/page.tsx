'use client';

import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OpenEye from '@/components/svgs/openEye.svg';
import CloseEye from '@/components/svgs/closeEye.svg';
import { useUser } from '@/components/hooks/useUser';

const EditProfile = () => {
  const router = useRouter();
  const { theme } = useThemeStore();
  const user = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const res = await fetch('/api/editprofile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Something went wrong');
      return;
    }

    alert('Profile Updated!');
    router.push('/');
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
        <label className={`w-full`} htmlFor="name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="name"
            name="name"
            type="text"
            placeholder="Add Your Name"
          />
        </label>

        {/* EDIT EMAIL */}
        <label className={`w-full`} htmlFor="email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="email"
            name="email"
            type="email"
            placeholder="Add Your Email"
          />
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
            placeholder="Add Your Password"
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
        <label className={`relative group w-full`} htmlFor="confirm-password">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="confirm-password"
            name="confirm-password"
            type={`${showConfirmPassword ? 'text' : 'password'}`}
            placeholder="Confirm Your Password"
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
