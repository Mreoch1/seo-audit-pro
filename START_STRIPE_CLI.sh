#!/bin/bash

# Start Stripe CLI with correct port
echo "🚀 Starting Stripe CLI..."
echo ""
echo "Forwarding webhooks to: localhost:3000/api/webhook"
echo ""
echo "Press Ctrl+C to stop"
echo ""

stripe listen --forward-to localhost:3000/api/webhook

