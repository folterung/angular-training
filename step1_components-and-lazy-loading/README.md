## Step 1 - Components and lazy loading

The objective for this step is to understand how to leverage the Angular Router to provide lazy loading benefits to your project.

Why learn this as part of the first step?

That's a great question! It is my belief that understanding how to work with Angular's Router is a vital piece of making a well-oiled SPA with Angular. So for the first step we will be creating some lazily loaded components to see how that all works.

### Steps

1. Create a directory for our `home` in `src/app/`.
2. Add a component file (`home.component.ts`) to the `src/app/home` directory.
3. Add a template file (`home.component.html`) to the `src/app/home` directory.
4. Add a style file (`home.component.scss`) to the `src/app/home` directory.
5. Add a module file (`home.module.ts`) to the `src/app/home` directory.
6. Add a test file (`home.component.spec.ts`) to the `src/app/home` directory.
7. Add an `index.ts` file to `src/app/home` to expose members to be exported.
8. Repeat the above steps to create the `AddTodoComponent` following the same file naming conventions as previously stated.
9. Modify `app-routing.module.ts` to lazily load our previously defined modules.

**If you get stuck at any point please defer to the associated `solution` directory for guidance.**
