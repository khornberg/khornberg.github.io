---
layout: post
title: Expanding the Root Volume of an AMI
categories: ['articles']
tags: ['aws', 'packer']
published: True

---

How does one keep Amazon Linux but have a larger root volume?

## The Problem

The default Amazon Linux AMI comes with an eight gigabyte root volume. That is not enough in some cases.

## A Solution

Use Packer's [`EBS Surrogate Builder`](https://www.packer.io/docs/builders/amazon-ebssurrogate.html). Turns out it is pretty easy with Packer.


### Template file

The template file below filters for the `amazon_linux_version` of `2017.03` to use that as the base.

```
{% raw %}
{
  "variables": {
    "amazon_linux_version": "2017.03",
    "aws_access_key": "",
    "aws_secret_key": ""
  },
  "builders": [{
    "type": "amazon-ebssurrogate",
    "access_key": "{{user `aws_access_key`}}",
    "secret_key": "{{user `aws_secret_key`}}",
    "region": "us-east-2",
    "source_ami_filter": {
        "filters": {
            "virtualization-type": "hvm",
            "name": "*amzn-ami-hvm-{{user `amazon_linux_version`}}*-x86_64-gp2",
            "root-device-type": "ebs"
        },
        "owners": ["137112412989"],
        "most_recent": true
    },
    "ami_virtualization_type": "hvm",
    "instance_type": "t2.micro",
    "ssh_username": "ec2-user",
    "launch_block_device_mappings" : [
      {
        "volume_type" : "gp2",
        "device_name" : "/dev/xvda",
        "delete_on_termination" : true,
        "volume_size" : 8
      }
    ],
    "ami_root_device": {
      "source_device_name": "/dev/xvda",
      "device_name": "/dev/xvda",
      "delete_on_termination": true,
      "volume_size": 100,
      "volume_type": "gp2"
    }
  }]
}
{% endraw %}
```
