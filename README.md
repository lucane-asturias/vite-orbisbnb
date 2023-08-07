
<h1 align="center">Vite - OrbisBnB</h1>

## Table of Contents

- [Overview](#overview)
- [Objective](#objective)
- [Main Utilities](#main-utilities)
- [How to run](#how-to-run)

## Overview

A project mostly focused on learning how a web client interacts with GraphQL API. 
It uses Vue Apollo library to interact with Graphql API and perform requests (queries and mutations), which makes it easier to fetch data from components.
While I was at it, I reapply most of what I've been learning recently, like form validation (VeeValidate), i18n, formating objects after consuming API's, etc.

I was intrigued by GraphQL's convenient syntax on how any https requests are fetched from a single endpoint. So I created this basic project to practice what I have been learning. I found the following free course when I was researching on the topic, from which the GraphQL boilerplate of this repository originates:
[Building Your First GraphQL Server with Node and TypeScript](https://www.newline.co/courses/the-newline-guide-to-building-your-first-graphql-server-with-node-and-typescript)
They teach on how the GraphQL API is built from scratch, it was really helpful.

## Objective
Understand the basics around the GraphQL ecosystem and the advantages it offers compared to traditional REST APIs.

## Main Utilities

- GraphQL
- Vue Apollo
- Tailwind
- Cloudinary - to store lodging images
- Pinia - to store delete image token and filter listings in search input
- VeeValidate (form validation)
- Vue i18n (internalization)
- Vitest
- V-Money3

## How To Run

```bash
# Install client and server dependecies
$ npm install

# Run the app and the server
$ npm run dev
$ npm run start
```
