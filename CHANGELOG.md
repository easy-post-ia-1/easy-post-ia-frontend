# 📜 CHANGELOG

This document lists breaking changes for each major release.

## v0.0.4 (09/12/2024)

KAN-33, KAN-30, KAN-31, Feature: Create CRUD Post, Bottom Navigation.

- Update test to divide to e2e(integration), unit.
- Add translations to validators and post screens.
- Create adapter to post to receive snake_case and return camelCase and viceverse.
- Add Planceholder to imahge post if its empty.
- Modify Login and Sign up to write types in ts.
- Add logo to Navbar.
- Refactorize Navbar to Simplified logic of Avatar, BottomNavigation, Options in desktop.
- Create PostCard and PostsCards and empty state.
- Create new Post with different options, save, publish, delete.
- Divide better the hooks.
- Create hooks to mutations and queries posts.
- Add model post and update zustand model.
- Add private routes /post, /posts, and services.
- Create auth, bottom navigation store.
- Create interceptor in axios to verify through slice the token and add in each service.
- Update constants, enums to get better imports and initial states in the components.
- Add validators to post component.
- Update package and add new package for the time and input time with luxon.
- Update pre push to allow only unit test.

## v0.0.3 (20/11/2024)

Feature: KAN-2, KAN-10, KAN-16, KAN-26, KAN-27, KAN-28, Update project structure and add login, signup, logout.

- Configure imports, include types and tsx.
- Create constants, enums, errors, validations.
- Add fonts, package.
- Add providers, routes and Snackbar to notifications.
- Add reset and normalize css.
- Create store, slice user, state and action with zustand.
- Create services with axios.
- Create routes, public, private and protected routes.
- Create initial components to NotFound, Home, SignUp, Login, Navbar, Loading.
- Create models to typscript interfaces, types.
- Create hooks to mutation, queries, forms, alert notifications, navbar.
- Create component to alert notifications with Notistack.
- Add components to SignUp, Login, Navbar, Loading.
- Add image to signup, login and logo.
- Create adapter to user.
- Create i18n files to translations and validations translations.
- Generate initial config to tests and first e2e test to SignUp.
- Add types to i18next, react scripts, resources i18n.

## v0.0.2 (17/09/2024)

Feature: KAN-12, Modify structure and update config.

- Update structure to the project.
- Update pre-push.
- Add svg config to import.
- Add tests config.
- Install types and react query, notifications, luxon time.

## v0.0.1 (13/09/2024)

**Feature: KAN-11, Update README and Package.json**

**Feature: KAN-11, Add tools and update config**

- Add husky to monitor commit and push.
- Add capacitor to mobile development.
- Add linters, formats, configs.
- Update README.
