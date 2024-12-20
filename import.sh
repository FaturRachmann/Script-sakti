for eml in /tmp/extracted_emails/Inbox*/*.eml; do
    zmmailbox -z -m contoh@email.com addMessage /Inbox "$eml"
done
