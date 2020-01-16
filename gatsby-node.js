const Gitlab = require('gitlab/dist/es5').default;
const crypto = require('crypto');

exports.sourceNodes = async ({ actions: { createNode } }, configOptions) => {
  if (!configOptions.accessToken) {
    throw 'You need to enter an accessToken';
  }

  const api = new Gitlab({
    token: configOptions.accessToken,
  });

  const user = await api.Users.current();
  const projects = await api.Projects.all({ owned: true });

  projects.map(async project => {
    const jsonString = JSON.stringify(project);

    const projectNode = {
      projectID: project.id,
      id: project.id.toString(),
      description: project.description,
      visibility: project.visibility,
      default_branch: project.default_branch,
      ssh_url_to_repo: project.ssh_url,
      http_url_to_repo: project.http_url,
      web_url: project.web_url,
      tag_list: project.tag_list,
      readme_url: project.readme_url,
      avatar_url: project.avatar_url,
      owner: {
        id: project.owner.id.toString(),
        name: project.owner.name,
        created_at: project.owner.created_at,
      },
      name: project.name,
      name_with_namespace: project.name_with_namespace,
      path_with_namespace: project.path_with_namespace,
      path: project.path,
      issues_enabled: projects.issues_enabled,
      open_issues_count: projects.open_issues_count,
      merge_requests_enabled: projects.merge_requests_enabled,
      jobs_enabled: projects.jobs_enabled,
      wiki_enabled: projects.wiki_enabled,
      created_at: project.created_at,
      last_activity_at: project.last_activity_at,
      creator_id: project.creator_id.toString(),
      namespace: {
        id: project.namespace.id.toString(),
        name: project.namespace.name,
        path: project.namespace.path,
        kind: project.namespace.kind,
        full_path: project.namespace.full_path,
      },
      import_status: project.import_status,
      archived: project.archived,
      forks_count: project.forks_count.toString(),
      star_count: project.star_count.toString(),
      _links: {
        self: project._links.self,
        issues: project._links.issues,
        merge_requests: project._links.merge_requests,
        repo_branches: project._links.repo_branches,
        labels: project._links.labels,
        events: project._links.events,
        members: project._links.members,
      },
      children: [],
      parent: `__SOURCE__`,
      internal: {
        type: `GitlabProjects`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(jsonString)
          .digest(`hex`),
      },
    };

    createNode(projectNode);
  });

  const jsonStringUser = JSON.stringify(user);

  const userNode = {
    userID: user.id,
    bio: user.bio,
    name: user.name,
    email: user.email,
    state: user.state,
    username: user.username,
    profile_url: user.web_url,
    location: user.location,
    avatar: user.avatar_url,
    website: user.website_url,
    organization: user.organization,
    socialMedia: {
      skype: user.skype,
      linkedin: user.linkedin,
      twitter: user.twitter,
    },
    id: user.id.toString(),
    parent: `__SOURCE__`,
    internal: {
      type: `GitlabUser`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(jsonStringUser)
        .digest(`hex`),
    },
  };
  createNode(userNode);
};
