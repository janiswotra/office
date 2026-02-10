#!/bin/bash
# Script to open port 3002 in AWS Security Group

echo "🔓 Opening port 3002 in AWS Security Group..."

# Get EC2 metadata token
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# Get instance ID
INSTANCE_ID=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
echo "Instance ID: $INSTANCE_ID"

# Check if AWS CLI is available
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found"
    echo ""
    echo "Please open port 3002 manually:"
    echo "1. Go to AWS EC2 Console"
    echo "2. Find instance: $INSTANCE_ID"
    echo "3. Security Groups → Edit Inbound Rules"
    echo "4. Add rule: Custom TCP, Port 3002, Source 0.0.0.0/0"
    exit 1
fi

# Get security group ID
SG_ID=$(aws ec2 describe-instances --instance-id $INSTANCE_ID --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' --output text 2>/dev/null)

if [ -z "$SG_ID" ]; then
    echo "❌ Could not get security group ID"
    exit 1
fi

echo "Security Group: $SG_ID"

# Add inbound rule for port 3002
echo "Adding inbound rule..."
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 3002 \
    --cidr 0.0.0.0/0 \
    --description "Dragon HQ Status Server" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Port 3002 opened successfully!"
    echo ""
    echo "Testing external access..."
    sleep 2
    curl -s http://3.74.149.204:3002/health | jq '.'
else
    echo "⚠️  Rule may already exist or permission denied"
    echo "Check AWS Console to verify port 3002 is open"
fi
