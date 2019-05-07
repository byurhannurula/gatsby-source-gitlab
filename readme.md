# gatsby-source-gitlab
> Gatsby.js source plugin for loading information from GitLab

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/) <br />
*Live example site coming soon!*

## Install

```bash
npm install gatsby-source-gitlab
# OR
yarn add gatsby-source-gitlab
```

## How to use

```js
// gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-gitlab`,
    options: {
      // You can get your access token on your GitLab profile
      accessToken: 'your access token here',
    }
  },
]
```

## GraphQL Queries

To see all possible queries please use the GraphiQL editor which is available under ``http://localhost:8000/___graphql``

### Get all projects of the user:

```graphql
query {
  allGitlabProjects {
    edges {
      node {
        id
        name
        description
        created_at
        visibility
        default_branch
        web_url
        readme_url
        owner {
          id
          name
        }
        forks_count
        star_count
        archived
        import_status
        name_with_namespace
        path_with_namespace
        path
        last_activity_at
        creator_id
        namespace {
          id
          name
          path
          kind
          full_path
        }
        _links {
          self
          issues
          merge_requests
          repo_branches
          labels
          events
          members
        }
      }
    }
  }
}
```


### Get all user information:

```graphql
query {
  gitlabUser {
    id
    name
    email
    username
    bio
    state
    avatar
    location
    website
    profile_url
    organization
    socialMedia {
      skype
      twitter
      linkedin
    }
  }
}
```

## License
[MIT](./license) &copy; [Byurhan Beyzat](https://byurhanbeyzat.com/). <br />
[Buy me a coffee](https://ko-fi.com/X7X38NNC)