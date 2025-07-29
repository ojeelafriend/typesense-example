module.exports = {
  apps: [
    {
      name: "edoze.odev.lat/core/",
      script: "npm",
      args: "run dev",
      cwd: "/home/ubuntu/edoze/api",
      autorestart: true,
    },
  ],
};
