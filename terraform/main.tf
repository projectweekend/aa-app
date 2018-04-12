provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "pw-terraform-state"
    key    = "exitcodezero/aa-app.tfstate"
    region = "us-east-1"
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket_name}"
  acl    = "public-read"

  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.bucket_name}/*"
        }
    ]
}
POLICY

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
