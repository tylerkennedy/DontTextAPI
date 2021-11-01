# 👷 Dont Text - Spam Text Number Lookup Tool

Welcome Cloudflare team! Thanks for checking out my project and for building an awesome platform of tools to make projects like this possible.

**Note: this project uses two repositories, check out the other one here: https://github.com/tylerkennedy/DontTextHugo**

## Project Overview

This project is a tool to check if a phone number is used to send spam text messages. A user can access the website and enter a phone number or email address to see if that number is a known sender of spam text messages. 

When a user enters a phone number into the website, a Cloudflare worker performs a lookup in the database to see if Dont Text has seen this number sending spam text messages before. 

Dont Text uses Cloudflare Pages, Workers, and KV. 

## Project Design

### Workers and KV

This repository hosts the Worker that makes lookups to the database in KV. The KV database stores spam text message data with known spam text senders that this tool uses to check if a phone number is spam.

Another Worker is used to power the Dont Text iOS app. This worker performs filtering logic to detect spam text messages received by a user with the app installed. When a spam text is found, the Worker saves the sender in KV. This provides the dataset for the lookup tool to check if a sender is spam. Dont Text is avaliable on the [App Store](https://apps.apple.com/us/app/dont-text/id1540836811/) to download.

### Pages

The spam text number lookup tool is hosted at https://donttext.app/tools/. The rest of the website and blog is a statically generated site using Hugo. You can find the [homepage](https://donttext.app/) and [blog](https://donttext.app/blog/) at these links. 

Dont Text's website uses Cloudflare pages for hosting and the **repo can be found here**: https://github.com/tylerkennedy/DontTextHugo (Sorry, I could only include 1 repo in my submission).
