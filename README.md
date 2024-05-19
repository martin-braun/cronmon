# cronmon

This is a simplified Debian-hosted status monitor proxy for your cron jobs at cron-job.org (self-hosted should also work). Its purpose is to simply indicate if there are failed jobs or not.

## Dependencies

- Deno
- Ansible (for deployment)
- rsync (for deployment)

## Development

- Run `cp -n .env.example .env` to bootstrap `.env`
- Modify `.env`
- Cache your deps via `./deps.ts`
- Run `./cronmon.ts` to start

## Deployment

The deployment is fully automated via `ansible-playbook` and `ansible-galaxy`. It's meant to be installed on a fresh Debian system. It will install `cronmon` in combination with `nginx` (reverse proxy) on port 80. For this do the following:

- Install Ansible
- Run `ansible-galaxy install -r requirements.yml && cp -n inventory.cfg.example inventory.cfg` to bootstrap ansible files (collections, roles and inventory template)
- Update production remote hosts and variables in `inventory.cfg`
- Run `ansible-playbook -v playbook.yml` to deploy to all hosts (or `ansible-playbook -v playbook.yml -l localhost:host1:host2:..` for explicit deployment, localhost is mandatory)

> [!NOTE]
> If you want to service this proxy via SSL, consider CloudFlare or pfSense. You can also choose to incorperate `certbot` into the `playbook.yml`, but this is no objective of this project.

## Usage

As of now, there is only one endpoint, which is `/` (`GET`). It is recommend to route a subdomain to this endpoint.
This endpoint will only return status 200 if all cron jobs been sucessful on their last run.

To leverage this proxy just use any monitor app for web resources, such as [webmon](https://github.com/theAkito/webmon).

## Why this tool?

There aren't any apps that allow to monitor a web resource while providing a bearer token and allowing to parse resulting JSON.
The endpoint from cron-job.org would also not send a different response code when some cron job failed.

Copying all cron-jobs into webmon would also cause the device to drain too much battery over time. 
It is beneficial to have only one endpoint. You often just want to know if any cron job failed. Once you know something went wrong,
you can login to cron-job.org and investigate further. 
