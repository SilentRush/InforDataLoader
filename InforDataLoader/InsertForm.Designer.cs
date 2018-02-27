using System.ComponentModel;

namespace InforDataLoader
{
    partial class InsertForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.browseBtn = new System.Windows.Forms.Button();
            this.csvFilePath = new System.Windows.Forms.TextBox();
            this.viewModelBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.headerPanel = new System.Windows.Forms.Panel();
            ((System.ComponentModel.ISupportInitialize)(this.viewModelBindingSource)).BeginInit();
            this.SuspendLayout();
            // 
            // browseBtn
            // 
            this.browseBtn.Location = new System.Drawing.Point(381, 32);
            this.browseBtn.Name = "browseBtn";
            this.browseBtn.Size = new System.Drawing.Size(75, 23);
            this.browseBtn.TabIndex = 0;
            this.browseBtn.Text = "Browse";
            this.browseBtn.UseVisualStyleBackColor = true;
            this.browseBtn.Click += new System.EventHandler(this.browseBtn_Click);
            // 
            // csvFilePath
            // 
            this.csvFilePath.Location = new System.Drawing.Point(12, 34);
            this.csvFilePath.Name = "csvFilePath";
            this.csvFilePath.ReadOnly = true;
            this.csvFilePath.Size = new System.Drawing.Size(363, 20);
            this.csvFilePath.TabIndex = 1;
            // 
            // viewModelBindingSource
            // 
            this.viewModelBindingSource.DataSource = typeof(InforDataLoader.ViewModel);
            // 
            // headerPanel
            // 
            this.headerPanel.Location = new System.Drawing.Point(12, 61);
            this.headerPanel.Name = "headerPanel";
            this.headerPanel.Size = new System.Drawing.Size(444, 198);
            this.headerPanel.TabIndex = 2;
            // 
            // InsertForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(468, 271);
            this.Controls.Add(this.headerPanel);
            this.Controls.Add(this.csvFilePath);
            this.Controls.Add(this.browseBtn);
            this.Name = "InsertForm";
            this.Text = "InsertForm";
            this.Load += new System.EventHandler(this.InsertForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.viewModelBindingSource)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        protected override void OnClosing(CancelEventArgs e)
        {
            base.OnClosing(e);
            this.Owner.Show();
        }

        #endregion
        private System.Windows.Forms.BindingSource viewModelBindingSource;
        private System.Windows.Forms.Button browseBtn;
        private System.Windows.Forms.TextBox csvFilePath;
        private System.Windows.Forms.Panel headerPanel;
    }
}