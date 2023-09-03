# cronmon

This is a working first draft of a status monitor proxy for your cron jobs at cron-job.org (self-hosted should also work).

## Setup

- Copy `.env.example` to `.env` and fill in your bearer token (`CRON_JOB_API_KEY`)
- Upload to your server or install `git` and `git clone git@github.com:martin-braun/cronmon.git && cd cronmon`
- Install [Deno](https://deno.land) and [Pup](https://deno.land/x/pup)
- Run `pup install --name cronmon`

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
