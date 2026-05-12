resource "aws_iam_user" "hx-graph-heroku" {
  name = "hx-graph-heroku"
  path = "/system/"
}

resource "aws_iam_access_key" "hx-graph-heroku" {
  user = aws_iam_user.hx-graph-heroku.name
}

resource "aws_iam_user_policy" "hx-graph-heroku-policy" {
  name = "hx-graph-heroku"
  user = aws_iam_user.hx-graph-heroku.name

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublishingMessages",
            "Effect": "Allow",
            "Action": "sns:Publish",
            "Resource": "*"
        },
        {
            "Sid": "AllowManagingUserTopics",
            "Effect": "Allow",
            "Action": [
                "sns:Unsubscribe",
                "sns:Subscribe",
                "sns:SetEndpointAttributes",
                "sns:ListSubscriptionsByTopic",
                "sns:GetEndpointAttributes",
                "sns:CreateTopic",
                "sns:CreatePlatformEndpoint"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}

output "hx-graph-heroku-secret" {
  value = aws_iam_access_key.hx-graph-heroku.secret
}

locals {
  apns_certificate = file("./apns-certificate")
  apns_key = file("./apns-key")
  fcm_key = file("./fcm-key")
}

resource "aws_sns_platform_application" "apns_application" {
  name = "PushIOS"
  platform = "APNS"
  platform_principal = local.apns_certificate
  platform_credential = local.apns_key
  # The platform application was modified directly and this value was
  # set in the process. It doesn't appear to be possible to unset the
  # value via Terraform or the UI, so we're adding it to the
  # definition. On its own, this doesn't impact behavior.
  success_feedback_sample_rate = 100
}

resource "aws_sns_platform_application" "gcm_application" {
  name = "PushAndroid"
  platform = "GCM"
  platform_credential = local.fcm_key
  # The platform application was modified directly and this value was
  # set in the process. It doesn't appear to be possible to unset the
  # value via Terraform or the UI, so we're adding it to the
  # definition. On its own, this doesn't impact behavior.
  success_feedback_sample_rate = 100
}
