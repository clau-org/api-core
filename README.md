# api-core

## Development

To run this module in development mode run:

```
deno task dev
```

## Test

To run the test for this module run:

```
deno task test
```

### Test in development mode

To run the test for this module in development mode run:

```
deno task test:dev
```

## Preview

To preview this module run:

```
deno task preview
```

## Change schema

To update this module schema run:

```
deno task prisma
```

## Push schema changes to DB

To push the schema changes of this module run:

```
deno task prisma:push
```

## Release

To release a new `patch` version push to main. To any type of release go to the
repo under actions publish release select.

To skip a release add `[skip]` to the commit message

## Usage

To use the module in any deno script

```ts
import { Logger } "https://cdn.jsdelivr.net/gh/clau-org/api-core@latest/src/log.ts"
```
