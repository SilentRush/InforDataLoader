using System.ComponentModel;

namespace InforDataLoader
{
    partial class MainMenu
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

        protected override void OnClosing(CancelEventArgs e)
        {
            base.OnClosing(e);
            this.Owner.Show();
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.Insert = new System.Windows.Forms.Button();
            this.Update = new System.Windows.Forms.Button();
            this.Upsert = new System.Windows.Forms.Button();
            this.Delete = new System.Windows.Forms.Button();
            this.Export = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.ClickedBtnLabel = new System.Windows.Forms.Label();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 5;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.Controls.Add(this.Insert, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.Update, 1, 0);
            this.tableLayoutPanel1.Controls.Add(this.Upsert, 2, 0);
            this.tableLayoutPanel1.Controls.Add(this.Delete, 3, 0);
            this.tableLayoutPanel1.Controls.Add(this.Export, 4, 0);
            this.tableLayoutPanel1.Location = new System.Drawing.Point(12, 114);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(556, 40);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // Insert
            // 
            this.Insert.Location = new System.Drawing.Point(3, 3);
            this.Insert.Name = "Insert";
            this.Insert.Size = new System.Drawing.Size(105, 34);
            this.Insert.TabIndex = 0;
            this.Insert.Text = "Insert";
            this.Insert.UseVisualStyleBackColor = true;
            this.Insert.Click += new System.EventHandler(this.Insert_Click);
            // 
            // Update
            // 
            this.Update.Location = new System.Drawing.Point(114, 3);
            this.Update.Name = "Update";
            this.Update.Size = new System.Drawing.Size(105, 34);
            this.Update.TabIndex = 1;
            this.Update.Text = "Update";
            this.Update.UseVisualStyleBackColor = true;
            this.Update.Click += new System.EventHandler(this.Update_Click);
            // 
            // Upsert
            // 
            this.Upsert.Location = new System.Drawing.Point(225, 3);
            this.Upsert.Name = "Upsert";
            this.Upsert.Size = new System.Drawing.Size(105, 34);
            this.Upsert.TabIndex = 2;
            this.Upsert.Text = "Upsert";
            this.Upsert.UseVisualStyleBackColor = true;
            this.Upsert.Click += new System.EventHandler(this.Upsert_Click);
            // 
            // Delete
            // 
            this.Delete.Location = new System.Drawing.Point(336, 3);
            this.Delete.Name = "Delete";
            this.Delete.Size = new System.Drawing.Size(105, 34);
            this.Delete.TabIndex = 3;
            this.Delete.Text = "Delete";
            this.Delete.UseVisualStyleBackColor = true;
            this.Delete.Click += new System.EventHandler(this.Delete_Click);
            // 
            // Export
            // 
            this.Export.Location = new System.Drawing.Point(447, 3);
            this.Export.Name = "Export";
            this.Export.Size = new System.Drawing.Size(106, 34);
            this.Export.TabIndex = 4;
            this.Export.Text = "Export";
            this.Export.UseVisualStyleBackColor = true;
            this.Export.Click += new System.EventHandler(this.Export_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(208, 37);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(162, 25);
            this.label1.TabIndex = 1;
            this.label1.Text = "Infor Data Loader";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // ClickedBtnLabel
            // 
            this.ClickedBtnLabel.AutoSize = true;
            this.ClickedBtnLabel.Location = new System.Drawing.Point(266, 78);
            this.ClickedBtnLabel.Name = "ClickedBtnLabel";
            this.ClickedBtnLabel.Size = new System.Drawing.Size(0, 13);
            this.ClickedBtnLabel.TabIndex = 2;
            // 
            // InforDataLoader
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Control;
            this.ClientSize = new System.Drawing.Size(589, 183);
            this.Controls.Add(this.ClickedBtnLabel);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "InforDataLoader";
            this.Text = "Infor Data Loader";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button Insert;
        private System.Windows.Forms.Button Update;
        private System.Windows.Forms.Button Upsert;
        private System.Windows.Forms.Button Delete;
        private System.Windows.Forms.Button Export;
        private System.Windows.Forms.Label ClickedBtnLabel;
    }
}

