# Moonarr 


<div align="center">
    <picture style="margin-left: 8px">
    <source media="(prefers-color-scheme: dark)" srcset="./public/images/moonarr-dark-1200.webp">
    <source media="(prefers-color-scheme: light)" srcset="./public/images/moonarr-light-1200.webp">
    <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="./public/images/moonarr-dark-1200.webp" title="Moonarr" alt="Moonarr" width="100" height="100">&nbsp;
    </picture>
</div>

---

![GitHub all releases](https://img.shields.io/github/downloads/FlizzerMDX/Moonarr/total)
![GitHub language count](https://img.shields.io/github/languages/count/FlizzerMDX/Moonarr)
![GitHub top language](https://img.shields.io/github/languages/top/FlizzerMDX/Moonarr?color=yellow)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/FlizzerMDX/Moonarr)
![GitHub forks](https://img.shields.io/github/forks/FlizzerMDX/Moonarr?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/FlizzerMDX/Moonarr?style=social)

<!-- Put after theses lines, ctrl + shift + p and write "Markdown" and click to "Markdwon all ine one" extension -->

- [Moonarr](#moonarr)
- [❓ What is Moonarr ?](#-what-is-moonarr-)
  - [🪪 Why is it called Moonarr ?](#-why-is-it-called-moonarr-)
  - [🎯 Our goal](#-our-goal)
  - [🖼️ Our Logo](#️-our-logo)
- [🦾 Which technologies and packages does it use ?](#-which-technologies-and-packages-does-it-use-)
  - [🧩 Framework](#-framework)
    - [⚛️➡️ Next.js](#️️-nextjs)
  - [📦 Packages](#-packages)
    - [🌊 Tailwind CSS](#-tailwind-css)
    - [🆔 NextAuth.js](#-nextauthjs)
    - [📝 Lexkit](#-lexkit)
    - [💠 Shadcnui](#-shadcnui)
    - [💠 Jollyui](#-jollyui)
- [🏁 Getting Start](#-getting-start)
  - [📋 PREREQUISITES](#-prerequisites)
  - [📋 Steps to create or modify your readme](#-steps-to-create-or-modify-your-readme)
- [🚧 Development \& Deployment](#-development--deployment)
  - [⚙️ CONFIGURATION](#️-configuration)
    - [Create your GitHub Provider](#create-your-github-provider)
    - [🔏 Environment file](#-environment-file)
  - [👨‍💻 Local Development](#-local-development)
  - [🚀 Deployment](#-deployment)
    - [🏷️ Get The Image](#️-get-the-image)
    - [🔄 Docker Run](#-docker-run)
- [🗪 FAQ](#-faq)
  - [What's happens if i already don't have a readme profile ?](#whats-happens-if-i-already-dont-have-a-readme-profile-)

# ❓ What is Moonarr ?

Moonar is an open-source website, to let user customize his own profile readme, without writing any markdown line !

## 🪪 Why is it called Moonarr ?

## 🎯 Our goal

Our goal with this website is to provide for anyone a solution to get a beautiful Readme for your profile, easier than expected. 🔥
>[!NOTE]
> ⭐️ Doesn't forget to give a star if your like this project ! ⭐️

## 🖼️ Our Logo

| dark mode | light mode |
| :--: | :--: |
| ![logo](./public/images/moonarr-dark-1200.webp) | ![logo](./public/images/moonarr-light-1200.webp) | 

Theses logos are made with ❤️ using **Adobe Illustator**

# 🦾 Which technologies and packages does it use ?


## 🧩 Framework 

### ⚛️➡️ Next.js
Next.js is an open-source framework, powered by ⚛︎ React.js and node.js.
[Next Documentation here](https://nextjs.org/docs)

## 📦 Packages

### 🌊 Tailwind CSS
Tailwind CSS is a CSS framework for rapidly building modern websites without ever leaving your HTML.
[Tailwind CSS Documentation here](https://tailwindcss.com/docs)

### 🆔 NextAuth.js
Next-auth is an open-source authentication librabry designed for next.js. Its goal here is to give microsoft entra id authentication.
[NextAuth.js Documentation here](https://next-auth.js.org/getting-started/introduction)

### 📝 Lexkit
[Lexkit Documentation here](https://lexkit.dev/docs/introduction)

### 💠 Shadcnui
[Shadcnui Documentation here](https://ui.shadcn.com/docs/installation)

### 💠 Jollyui
[Jollyui Documentation here](https://www.jollyui.dev/docs)

# 🏁 Getting Start

## 📋 PREREQUISITES

No prerequisites needed ! Just a GitHub account 😉

## 📋 Steps to create or modify your readme

1. Go to [Moonarr Website](https://moonarr.vercel.app)
2. Sign In with your GitHub Credentials
3. If you are not already, go to the [Edit page](https://moonarr.vercel.app/edit)

# 🚧 Development & Deployment

## ⚙️ CONFIGURATION

### Create your GitHub Provider
1. Go to [GitHub](https://github.com)
2. Go to Settings
3. Scroll down to Developer settings and click
4. Next, click to OAuth Apps -> New OAuth App
5. Put your Application name
6. Put your Homepage URL
7. Put the Authorization callback URL, which is your **hostname** with `/api/auth/callback/github` at the end, so for example for **moonarr** (https://moonarr.vercel.app), it's `https://moonarr.vercel.app/api/auth/callback/github`
8. CONFIRM
9. Keep the client ID
10. Generate a new client secret and keep it, we need client ID and client secret later.

### 🔏 Environment file

1. Clone or rename `.env.example` to `.env`
2. Add required values : 
   - `AUTH_GITHUB_CLIENT_ID`, the client id for your GitHub Provider 
   - `AUTH_GITHUB_CLIENT_SECRET`, the client id for your GitHub Provider 
   - `NEXTAUTH_URL`, The URL of your application
   - `NEXTAUTH_SECRET`, make `npx auth` or `openssl rand -base64 32`
>[!NOTE]
> The client id and client secret of your GitHub Provider is the both one generated at the previous step

## 👨‍💻 Local Development

## 🚀 Deployment

The best way to deploy this project, is to use its image from `Dockerhub` or `GitHub Registry`.

### 🏷️ Get The Image

`Dockerhub`
```
docker pull flizzermdx/moonarr:latest
```

`GitHub Registry`
```
docker pull ghcr.io/flizzermdx/moonarr:latest
```

### 🔄 Docker Run

```
docker run --name moonarr -p 3000:3000 -d flizzermdx/moonarr:latest
```
>[!NOTE]
> You can replace `flizzermdx/moonarr:latest` to `ghcr.io/flizzermdx/moonarr:latest` if you wanna use image from GitHub Registry
> You can also replace `latest` for version you wanna run


# 🗪 FAQ

## What's happens if i already don't have a readme profile ?

No worries ! If you don't have the project named like your username for example with me `FlizzerMDX/FlizzerMDX`, with a README.md inside, it's ok ! When you'll be in the /edit page, a message will pop-up and ask you if you wanna create it from scratch or a file