
const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const protectAdmin = require("../middleware/authMiddleware");

// POST: Save new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();

    console.log("Contact saved successfully:", savedContact._id);

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      contactId: savedContact._id,
    });
  } catch (error) {
    console.error("Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save your message.",
    });
  }
});

// GET: Fetch all messages (Admin only)
router.get("/", protectAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Fetch Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages.",
    });
  }
});

// PATCH: Update read/unread status (Admin only)
router.patch("/:id/read", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    if (typeof isRead !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isRead must be true or false.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isRead },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message status updated.",
      contact,
    });
  } catch (error) {
    console.error("Update Message Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update message status.",
    });
  }
});

// DELETE: Delete message (Admin only)
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contact message.",
    });
  }
});

module.exports = router;
