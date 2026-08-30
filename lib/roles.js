export const ROLES = [
  {
    value: "admin",
    label: "Admin",
    description: "Top-level access. Can do everything.",
    who: "Executive Director, IT Manager",
    permissions: [
      "Do everything on the site",
      "Post, edit or delete any content",
      "Add or remove staff members",
      "Change website settings",
      "Approve content from others",
      "Manage all social media accounts",
    ],
  },
  {
    value: "editor",
    label: "Editor",
    description: "Content manager with publishing rights.",
    who: "Communications Manager, Programs Manager",
    permissions: [
      "Create and publish posts",
      "Edit any content",
      "Upload images and files",
      "Review and approve contributor posts",
      "Manage social media posts",
    ],
  },
  {
    value: "contributor",
    label: "Contributor",
    description: "Content creator. Writes drafts only.",
    who: "Staff writers, Volunteers, Interns",
    permissions: [
      "Write posts (drafts only)",
      "Edit their own drafts",
      "Cannot publish (needs Editor approval)",
      "Cannot upload images (text only)",
      "Cannot delete content",
    ],
  },
  {
    value: "social-media-manager",
    label: "Social Media Manager",
    description: "Runs the social channels.",
    who: "Social Media Officer, Communications Officer",
    permissions: [
      "Post to Facebook, Twitter, Instagram, etc.",
      "Reply to comments and messages",
      "Create social media graphics",
      "Schedule posts",
      "May not edit website content",
    ],
  },
  {
    value: "community-manager",
    label: "Community Manager",
    description: "Engages and moderates the community.",
    who: "Community Engagement Officer",
    permissions: [
      "Respond to comments and DMs",
      "Engage with followers",
      "Moderate discussions",
      "May not create original posts",
      "Cannot change website content",
    ],
  },
];

export const ROLE_VALUES = ROLES.map((role) => role.value);

export function getRoleLabel(value) {
  return ROLES.find((role) => role.value === value)?.label || value;
}

export function getRole(value) {
  return ROLES.find((role) => role.value === value) || null;
}

export default { ROLES, ROLE_VALUES, getRoleLabel, getRole };
