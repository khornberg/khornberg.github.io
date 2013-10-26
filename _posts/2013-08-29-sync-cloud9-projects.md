---
layout: post
title: Sync Cloud9 Projects
tag: cloud9, git, tools, projects
---

Recently, I had a project on [Cloud9](https://c9.io) that I was also working on locally. After getting the different features ready at the different locations I had a conundrum. How do I sync these two repositories? Or more specifically, how do I sync the code from c9 to my local git repo?  

I could zip up everything at either location but that didn't seem to make sense. These are already git repositories.  

I could set up a [GitHub](https://github.com) repo but I have files locally I don't want public. I don't use [BitBucket](http://bitbucket.com) nor do I pay for private repos on GitHub. Both of those are certainly viable options.  

###Solution?

####Bare Git Repository  

Then I realized I can access my public c9 workspace with my code, why can't I just pull from that? Well, you can with a little work. I find this to be useful to sync projects that are on c9 and locally; between someone that doesn't use c9 but wants to push to or pull your repo; or to move a public c9 project to a private c9 project without using a hosting service.

Since my project was public, I can access it at https://c9.io/[user_name]/[project_name]/workspace.  

Now we need to make a bare git repo accessible.

Since, I was working a project, I had created a working git repo. That won't work for pulling, pushing, and cloning.  

Assuming your working on awesome-project.

##Steps
1. Clone a bare git repo  

```
git clone --bare awesome-project/ awesome-project.git
```

2. Update server info

```
cd awesome-project.git
git --bare update-server-info
```

3. Make the post-update hook executable

```
cd hooks
mv post-update.sample post-update
chmod a+x post-update
```

##Accessing
You can now push, pull, or clone your repo at https://c9.io/[user_name]/[project_name]/workspace/[git_repo_name]  
Of course you can add a remote so you don't have to type the url in every time.
```
git remote add c9 https://c9.io/[user_name]/[project_name]/workspace/awesome-project.git
```

I have only used this for public Cloud9 workspaces.
